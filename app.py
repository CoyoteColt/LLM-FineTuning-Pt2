import re
from flask import Flask, render_template, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)

loaded_model = AutoModelForCausalLM.from_pretrained("adjusted_model", device_map="auto")
tokenizer_loaded = AutoTokenizer.from_pretrained("adjusted_model")


def generate_diagnosis(prompt, model, tokenizer):
    encoded_input = tokenizer(prompt, return_tensors="pt", add_special_tokens=True)
    model_inputs = encoded_input.to('cuda')
    generated_ids = model.generate(**model_inputs, max_new_tokens=512, do_sample=True,
                                   pad_token_id=tokenizer.eos_token_id)
    decoded_output = tokenizer.batch_decode(generated_ids)[0]
    return decoded_output


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        prompt_input = request.form['user_input'] 
        prompt = (
            "Instruction: In your role as a medical professional, address the user's medical questions and concerns. "
            f"{prompt_input}. Can you give me any advice? <|end_of_turn|> AI Assistant:")

        response = generate_diagnosis(prompt, loaded_model, tokenizer_loaded)

        
        match = re.search(r'AI Assistant: (.*?)<\|end_of_turn\|>', response, re.DOTALL)

        if match:
            filtered_response = match.group(1).strip()  
        else:
            filtered_response = "Sorry, I was unable to process your request."

        
        return jsonify(response=filtered_response)

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
