from flask import Flask, render_template, request
from transformers import pipeline
import re  # Import the regex module

app = Flask(__name__)

# Load summarization model
summarizer = pipeline("summarization", model="t5-small")

# Define a list of unwanted words to filter out
UNWANTED_WORDS = [
    "hmm", "uhh", "nah", "haan", "uh", "um", "eh", "huh", "like", "you know", "so", "actually"
]

# Function to remove unwanted words from text
def clean_text(text):
    # Create a regex pattern to match unwanted words (case insensitive)
    pattern = r'\b(?:' + '|'.join(re.escape(word) for word in UNWANTED_WORDS) + r')\b'
    # Replace unwanted words with an empty string
    cleaned_text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    # Remove any extra spaces left after removing the words
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
    return cleaned_text

# Function to clean the summary (remove incomplete words, misplaced punctuation)
def clean_summary(summary_text):
    # Remove unwanted punctuation (fragments like periods or commas without context)
    summary_text = re.sub(r'\s?[.,!?;:()\[\]{}"\']\s?', ' ', summary_text)  # Remove unnecessary punctuation
    # Ensure there are no stray characters like 'n s', 'it .', etc.
    summary_text = re.sub(r'\b([a-zA-Z]{1,2})\b', '', summary_text)  # Remove very short, incomplete words
    # Remove excessive spaces
    summary_text = re.sub(r'\s+', ' ', summary_text).strip()
    return summary_text

@app.route('/', methods=['GET', 'POST'])
def home():
    summary = None
    error_message = None

    if request.method == 'POST':
        text = request.form['text']
        
        # Clean the text by removing unwanted words
        cleaned_text = clean_text(text)

        # Check if the length of the cleaned text is less than 20 characters
        if len(cleaned_text) < 20:
            error_message = "The text is too short to summarize. Please provide a longer passage."
        else:
            # Perform summarization using Hugging Face's pipeline
            try:
                # Ensure that the text doesn't get cut off too much by using safe max/min lengths
                if len(cleaned_text) > 1000:
                    summary = summarizer(cleaned_text, max_length=350, min_length=200, do_sample=False)
                elif len(cleaned_text) <= 1000 and len(cleaned_text) >= 500:
                    summary = summarizer(cleaned_text, max_length=250, min_length=150, do_sample=False)
                else:
                    summary = summarizer(cleaned_text, max_length=150, min_length=50, do_sample=False)
                
                # Clean the summary to ensure it's properly formatted
                summary_text = summary[0]['summary_text']
                summary_text = clean_summary(summary_text)  # Clean the final summary

                summary = summary_text  # Final clean summary text

            except Exception as e:
                error_message = f"An error occurred during summarization: {str(e)}"

    return render_template('index.html', summary=summary, error_message=error_message)

if __name__ == '__main__':
    app.run(debug=True)
