from fpdf import FPDF
from transformers import pipeline
import re

# Step 1: Read the content of the text file
def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    return text

# Step 2: Summarize the text using a pre-trained transformer model
def summarize_text(text,max_length,num_sentences=5):
    # Initialize the summarizer pipeline from Hugging Face
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    # Split text into chunks as transformer models have a token limit
    max_chunk_size = 1024  # BART's maximum input length in tokens
    chunks = [text[i:i + max_chunk_size] for i in range(0, len(text), max_chunk_size)]
    
    # Summarize each chunk and combine the results
    summary = ""
    for chunk in chunks:
        chunk_summary = summarizer(chunk, max_length=max_length, min_length=20, do_sample=False)
        summary += chunk_summary[0]['summary_text'] + " "
    
    # Returning the summarized text
    return summary.strip()

# Step 3: Generate a PDF from the summarized text
def generate_pdf(summary, output_pdf_path):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Load both regular and bold versions of the DejaVu font
    pdf.add_font('DejaVu', '', 'DejaVuSans.ttf', uni=True)  # Regular font
    pdf.add_font('DejaVuB', '', 'DejaVuSans-Bold.ttf', uni=True)  # Bold font

    # Set title (using bold font)
    pdf.set_font("DejaVuB", '', 16)
    pdf.cell(200, 10, text="Meeting Summary", ln=True, align='C')

    # Set body text (using regular font)
    pdf.set_font("DejaVu", '', 12)

    # Add the summarized text
    pdf.ln(10)  # Add a line break
    pdf.multi_cell(0, 10, summary)

    # Output the PDF
    pdf.output(output_pdf_path)

# Main function to run the entire process
def main():
    # Path to the text file
    input_file_path = "sample.txt"
    
    # Read the content of the file
    text_content = read_file(input_file_path)
    length = len(text_content.split())

    #base case : if no words are found. empty file
    if length == 0:
        print("Cannot be summarized")

    
    max_length = None 

    if length <= 500:
        max_length = 50 
    else:
        max_length = length//10
    
    
    # Summarize the content using the transformer model
    summary = summarize_text(text_content,max_length,num_sentences=8)



    
    # Generate PDF with the summary
    output_pdf_path = "summary_report.pdf"
    generate_pdf(summary, output_pdf_path)
    
    print(f"Summary PDF generated: {output_pdf_path}")

# Run the program
if __name__ == "__main__":
    main()
