# Fine-Tuning Deployment in a Web System

This is the second part of our project to fine-tune an LLM model and make it an expert for patient diagnosis. If you haven't seen the first part where we performed the fine-tuning, take a look [LLM-FineTuning-Pt1](https://github.com/CoyoteColt/LLM-FineTuning-Pt1?tab=readme-ov-file). The second part is much simpler compared to the first. In it, we will load the saved LLM and create a simple web page for user interaction. It is worth remembering that the goal is not to create a complete web system, with database and user control, but rather just to deploy the LLM in a more interactive way, although it is worth it, perhaps in a 2.0 version, to create a complete web system with all the requirements.

## Tools Used In The Second Part:
- **Flask**: Flask is a lightweight, easy-to-use Python micro web framework ideal for building fast, simple APIs and web applications.
- **transformers**: Transformer library to use some functions to load the saved model

## Getting Started With Flask
We will install flask in case you don't have it installed in your setup yet.
- **Install Flask**: "pip install Flask" in your terminal to install Flask dependencies
- **app.py**: Create the app.py file, this will be the center of everything

Flask follows an architectural pattern for how to build your applications and also comes pre-configured to determine where each file should be placed. Below you will find the basic structure of Flask.
- **adjusted_model**: Inside this folder is the downloaded and unzipped model.
- **static**: This is where we will place our customization files such as style.css and script.js and image.
- **templates**: Where we will organize all our html files. In our case we will have only one, index.html.
- **app.py**: Where the center of everything is, responsible for bringing together all the files listed above.

After everything is done, it will look like this:

<img src="image\Flask-arquit.png" alt="Flask-struct">

The .idea folder will be created automatically after the first run

## app.py

The app.py was created in a very simple way and consists only of loading the model and calling the index.html page. 

app.py composition:

- **Libraries**: Load all necessary dependencies
- **LLM Loading**: Loading the model and its tokenizer
- **generate_diagnosis()**: creation of the generate_diagnosis() function to generate model responses fed by a tokenized, model and promt
- **index()**: creation of the index() function which will be responsible for loading index.hmtl and capturing the prompt sent by the user on the front-end and returning the LLM response to the user.
- **regex**: We use some string processing tools to improve the look of the LLM response that will be presented to the user on the front-end.

## Booting The System
After all the settings are done, just start the system.
- **start**: To initialize, simply run the command "python app.py" in your terminal, which will generate a link that will be redirected to the system's web page.

After all these processes you will be able to deploy your model after Fine-Tuning.

<img src="image\page.jpg" alt="web-page" width="50%">

## Final Considerations
The aim of this project was to fine-tune a generic AI model and make it a specialist in the health area, being able to diagnose certain symptoms that the patient may be feeling. In part 1 of the project, we focused on fine-tuning the LLM and all its peculiarities, and in part 2 we performed a small deployment using Flask to create a web application to make it more interactive. II hope you enjoyed it, and if you have anything to contribute, feel free to do so. Thank you