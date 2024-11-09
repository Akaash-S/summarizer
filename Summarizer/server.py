from flask import Flask, render_template, request
from transformers import pipeline

app = Flask(__name__)

# Load summarization model
summarizer = pipeline("summarization", model="t5-small")

@app.route('/', methods=['GET', 'POST'])
def home():
    summary = None
    error_message = None

    if request.method == 'POST':
        text = request.form['text']
        
        # Check if the length of the text is less than 20 characters
        if len(text) < 20:
            error_message = "The text is too short to summarize. Please provide a longer passage."
        else:
            # Perform summarization using Hugging Face's pipeline
            if(len(text)>1000):
                summary = summarizer(text, max_length=350, min_length=200, do_sample=False)
            else:
                if(len(text)<=1000 and len(text)>=500):
                    summary = summarizer(text, max_length=200, min_length=150, do_sample=False)
                else:
                    summary = summarizer(text, max_length=100, min_length=50, do_sample=False)

    return render_template('index.html', summary=summary, error_message=error_message)

if __name__ == '__main__':
    app.run(debug=True)
