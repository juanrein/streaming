"""
add the correct filenames to template from webpack bundle
Run in scripts folder
"""
from pathlib import Path
import re

srcCss = "../mysite/frontend/build/static/css"
srcJs = "../mysite/frontend/build/static/js"

cssNewFilename = list(Path(srcCss).glob("*.css"))[0].name
jsNewFilename = list(Path(srcJs).glob("*.js"))[0].name

destFile = "../mysite/streaming_app/templates/streaming_app/index.html"

print("source js", Path(srcJs).absolute().resolve())
print("source css", Path(srcCss).absolute().resolve())

print("destination", Path(destFile).absolute().resolve())

with open(destFile, mode="r") as f:
    htmlText = f.read()

print("old filenames", re.search("/.*css", htmlText).group(0)[1:], 
        re.search("/.*js", htmlText).group(0)[1:])

print("new filenames", cssNewFilename, jsNewFilename)

htmlText = re.sub("/.*css", "/" + cssNewFilename, htmlText, 1)
htmlText = re.sub("/.*js", "/" + jsNewFilename, htmlText, 1)

with open(destFile, mode="w") as f:
    f.write(htmlText)
