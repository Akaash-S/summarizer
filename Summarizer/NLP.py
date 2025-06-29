"""
This is NLP part where i first 

1) removed unnecessary words like uh,oh and some undefined grammatical errors
2) compressed words like "working -> work" ... thus simplifying into "TOKENS"
3) seperated sentences from the paragraph
4) counted the no of occurences of the most common words in the sentences
5) using the probability matrix, we find the most important occuring words by counting each repeating word in EVERY SENTENCE




"""

import gensim 
import nltk 
nltk.download("punkt") 
nltk.download("stopwords") 
nltk.download("wordnet") 
from gensim.corpora import Dictionary 
from gensim.models import LdaModel 
from nltk.tokenize import word_tokenize 
from nltk.corpus import stopwords 
from nltk.stem import WordNetLemmatizer


#sample text 
text =  """



Good morning! Haseena . how are you…. Have u enjoyed your long weekend holiday in singapore

Yes , yes … the places were fantastic
how was the climate??
the climate was awesome… but the places I went such as lion statue, marina bay and the famous malls and markets. The rate of things there were super expensive
Yeah, i know but quality would be there….

Yes, ofcourse… but too damn expensive… 


Alright, so lets start the meeting
Good morning, everyone! Thanks for joining this meeting. Today,we all gathered here to  discuss about how we can implement AI in our current marketing strategies.So Let’s get started. Jaysurya, could you give us an overview?
Sure, Raj.So uh….. AI in marketing can automate customer segmentation, personalize content, and optimize campaign performance. and... By analyzing vast amounts of data, AI can help us target the right audience with the right message at the right time.
That sounds promising. But what specific AI tools are we talking about here? Are we considering machine learning algorithms, or something more advanced like neural networks?
Both, actually. We can use machine learning for predictive analytics and customer insights, and neural networks for more complex tasks like natural language processing and image recognition.
Before we dive deeper, we need to address data quality. We have a lot of data, but it's not always clean. We’ll need robust data cleaning processes to ensure our AI models are accurate.
Absolutely, data integrity is crucial. Dev, from a sales perspective, how do you see AI helping us?
AI can help us understand customer behavior better and predict future trends. By analyzing past sales data, we can identify patterns and tailor our sales strategies accordingly.
I’m thinking about the creative aspect. How can AI help us create better content? For example, can it help us design more engaging ads or write more compelling copy?
Yes, AI can assist with content creation. Tools like GPT-3 can generate text that sounds human, and image recognition algorithms can suggest visual content based on trends and customer preferences.
One concern I have is the cost. Implementing AI systems can be expensive. How do we justify the investment?
Good point. We need to balance the initial investment with the long-term benefits. Increased efficiency, better targeting, and higher conversion rates can lead to significant ROI.
Speaking of ROI, we also need to track the performance of our AI initiatives. Setting up KPIs and monitoring metrics is essential to measure success.
Right. And we should start small, maybe with a pilot project, and scale up based on the results. This approach minimizes risk and allows us to learn and adapt.
I’m excited about the potential, but I’m also wary of the learning curve. Our team will need training to effectively use these new tools.
Training is a must. We should allocate resources for comprehensive training programs and continuous learning.
Another aspect is data privacy. With AI analyzing customer data, we need to ensure we comply with GDPR and other regulations.
Definitely. Privacy and ethical considerations should be at the forefront of our AI strategy. We need to be transparent with our customers about how we use their data.
I have an idea. What if we use AI to analyze social media trends and create real-time content based on what’s popular? It could give us a competitive edge.
That's a creative approach,Haseena. We can explore that further. Okay, let’s take a short break and reconvene in 10 minutes. We have a lot more to cover.
Welcome back. Now, let’s brainstorm specific use cases for AI in our marketing campaigns.
How about using AI for customer support? Chatbots can handle common queries, freeing up our team for more complex issues.
That’s a good idea.Dev, Also, AI can help us identify high-value customers and tailor loyalty programs to retain them.
We could use predictive analytics to anticipate customer needs and personalize our offerings. For example, recommending products based on previous purchases.
What about A/B testing? AI can automate and analyze the results faster than manual methods, helping us determine the most effective strategies.
Agreed. And don't forget email marketing. AI can optimize send times, subject lines, and content based on user behavior.
These are all great ideas.Folks, Let’s prioritize them and outline a roadmap for implementation. We’ll start with a pilot project on customer segmentation.
We should also engage with our stakeholders and get their buy-in. AI can be intimidating, and we need everyone on board to make this a success.
Absolutely.Sanjay, Communication and collaboration are key. We should organize workshops and demo sessions to showcase the benefits of AI.
Let’s not forget to celebrate small wins along the way. Highlighting success stories can motivate the team and demonstrate value.
Great points. To wrap up, I'll summarize our action items: finalize the data cleaning process, start with a pilot project on customer segmentation, organize training programs, and engage stakeholders with demos and workshops. Does everyone agree?
Yes, sounds good.
Excellent. Thanks, everyone. Let’s reconvene in two weeks to review our progress.








"""


#take names,places,location for highlightation from the user and give more importance




import re

def is_invalid(text):
    # Define invalid patterns and numbers
    invalid_patterns = re.compile(r'[$%!@#^&*()0-9]')
    
    # Check for invalid characters or numbers
    if invalid_patterns.search(text):
        return True
    return False



things = []
while True:
    thing = input("Enter some thing for highlightation such as name,place,location... etc : ").strip()
    
    # Check if the input is 'quit' to terminate the loop... and also sanitize the input so that invalid inputs couldnt disrupt the program
    if len(thing) > 100 or is_invalid(thing) or thing.lower() == "quit":
        break
    things.append(thing)



sentences = list(text.split("."))

for text in sentences:
  if len(text) != 0:
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(word) for word in filtered_tokens]

    # Create a document-term matrix
    dictionary = gensim.corpora.Dictionary([lemmatized_tokens])
    corpus = [dictionary.doc2bow(doc) for doc in [lemmatized_tokens]]

    # Train the LDA model
    try:
      lda_model = gensim.models.LdaModel(corpus, num_topics=2, id2word=dictionary, passes=15)

      # Print the topics

      """
      we need to return the important words now... 
      """
      for idx, topic in lda_model.print_topics(-1):
            print([word.split("*")[1].strip().replace('"', '') for word in topic.split("+") if word not in set([',','.','+','-'])])
    except Exception as e:
      pass








