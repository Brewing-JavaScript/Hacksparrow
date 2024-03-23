from transformers import TFBartForConditionalGeneration, BartTokenizer

model = TFBartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')
tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')

def summarize_content(content):
    inputs = tokenizer([content], max_length=1024, return_tensors='tf', truncation=True)
    summary_ids = model.generate(inputs['input_ids'], num_beams=4, min_length=30, max_length=150, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary
