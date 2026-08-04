from flask import Flask, render_template, request
from deep_translator import GoogleTranslator

app = Flask(__name__)

# Cache translations
translation_cache = {}

@app.route("/", methods=["GET", "POST"])
def index():

    translated_text = ""
    input_text = ""
    source_lang = "auto"
    target_lang = "hi"

    if request.method == "POST":

        input_text = request.form["text"].strip()
        source_lang = request.form["source_lang"]
        target_lang = request.form["target_lang"]

        # Unique cache key
        cache_key = (input_text, source_lang, target_lang)

        # Return cached translation if available
        if cache_key in translation_cache:
            translated_text = translation_cache[cache_key]

        else:
            try:
                translated_text = GoogleTranslator(
                    source=source_lang,
                    target=target_lang
                ).translate(input_text)

                # Save in cache
                translation_cache[cache_key] = translated_text

            except Exception:
                translated_text = "Translation service is temporarily unavailable. Please try again."

    return render_template(
        "index.html",
        translated_text=translated_text,
        input_text=input_text,
        source_lang=source_lang,
        target_lang=target_lang
    )


if __name__ == "__main__":
    app.run(debug=True)