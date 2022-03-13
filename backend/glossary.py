from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
from os import environ
import random
import flask_excel as excel
import urllib.parse


def translate_google(eng_text):
    translator_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q="
    query = urllib.parse.quote(eng_text)
    r = requests.get(translator_url+query)
    result = json.loads(r.text)
    if (result != None and result[0] != None and result[0][0] != None and result[0][0][0] != None):
        return result[0][0][0]
    else: return 'NO TRANSLATION'


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


def create_app():
    app = Flask(__name__)
    app.config['FILENAME'] = ''
    app.config['GLOSSARY'] = []
    CORS(app)
    excel.init_excel(app)
    return app


app = create_app()


@app.route("/api/start", methods=['POST'])
def start():
    num = random.randint(1000, 99999)
    app.config['FILENAME'] = str(num) + '.csv'
    app.config['GLOSSARY'] = []
    return jsonify(isError=False,
                   message="Success",
                   statusCode=200), 200


@app.route("/api/stop", methods=['GET'])
def stop():
    if app.config['FILENAME'] != '':
        return excel.make_response_from_array(app.config['GLOSSARY'], "csv",
                                              file_name=app.config['FILENAME'])
    return jsonify(isError=True,
                   message="BAD",
                   statusCode=400), 400


@app.route("/api/add", methods=['GET', 'POST'])
def add():
    if request.method == 'POST' and app.config['FILENAME'] != '':
        data = request.get_json()
        print(data)
        breakpoint()
        ru_word = translate_google(data['word'])
        ru_text = translate_google(data['element'])
        defin = definite(data['word'])
        app.config['GLOSSARY'].append([data['word'], ru_word, defin,
                        data['element'],  ru_text])
        return jsonify(isError=False,
                       message="Success",
                       statusCode=200,
                       data={'word': ru_word, 'element': ru_text, "def": defin}), 200
    return jsonify(isError=True,
                   message="BAD",
                   statusCode=400), 400





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
