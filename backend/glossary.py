from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
from os import environ
import random
from google.cloud import translate
import flask_excel as excel

NAME = ''
glossary = []


def translate_google(eng_text):
    project_id = environ.get("PROJECT_ID", "")
    assert project_id
    parent = f"projects/{project_id}"
    client = translate.TranslationServiceClient()
    target_language_code = "ru"
    response = client.translate_text(
        contents=[eng_text],
        target_language_code=target_language_code,
        parent=parent,
    )
    if len(response.translations) > 0:
        return response.translations[0].translated_text
    else:
        return None


def definite(word):
    app_id = environ.get("APP_ID", "")
    app_key = environ.get("APP_KEY", "")
    language = "en-gb"
    word_id = word.lower().replace(' ', '_')
    url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/" + \
        language + "/" + word_id.lower()
    r = requests.get(url, headers={"app_id": app_id, "app_key": app_key})
    dic = json.loads(r.text)
    if (dic.get('results') != None):
        if(dic['results'][0].get('lexicalEntries') != None):
            if(dic['results'][0]['lexicalEntries'][0].get('entries') != None):
                if(dic['results'][0]['lexicalEntries'][0]
                   ['entries'][0].get('senses') != None):
                    if(dic['results'][0]['lexicalEntries'][0]
                       ['entries'][0]['senses'][0].get('definitions') != None):
                        return(dic['results'][0]['lexicalEntries'][0]
                               ['entries'][0]['senses'][0]['definitions'][0])
    return 'NO DEFINITION'


app = Flask(__name__)
CORS(app)
excel.init_excel(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/start", methods=['POST'])
def start():
    global NAME
    global glossary
    num = random.randint(1000, 99999)
    NAME = str(num) + '.csv'
    glossary = []
    return jsonify(isError=False,
                   message="Success",
                   statusCode=200), 200


@app.route("/stop", methods=['GET'])
def stop():
    global NAME
    global glossary
    if NAME != '':
        return excel.make_response_from_array(glossary, "csv",
                                              file_name=NAME)
    return jsonify(isError=True,
                   message="BAD",
                   statusCode=400), 400


@app.route("/api/add", methods=['GET', 'POST'])
def add():
    global NAME
    global glossary
    if request.method == 'POST' and NAME != '':
        data = request.get_json()
        print(data)
        ru_word = translate_google(data['word'])
        ru_text = translate_google(data['element'])
        defin = definite(data['word'])
        glossary.append([data['word'], ru_word, defin,
                        data['element'],  ru_text])
        return jsonify(isError=False,
                       message="Success",
                       statusCode=200,
                       data={'word': ru_word, 'element': ru_text, "def": defin}), 200
    return jsonify(isError=True,
                   message="BAD",
                   statusCode=400), 400
