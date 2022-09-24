# streaming service

## Setup

### Getting code
    git clone https://github.com/juanrein/streaming.git

    cd streaming

### Python
    1. create and activate virtual environment

    https://docs.python.org/3/library/venv.html

    2. install python dependencies from requirements.txt

    pip install -r requirements.txt
    
    3. create mysite/secret.json with secret key for django

    {
        "secret_key": "your_secret_key"
    }

    4. do database migrations

    python .\manage.py migrate

    5. create superuser

    python .\manage.py createsuperuser

    6. start development server

    python .\manage.py runserver

    7. login as admin and create content to site

    http://localhost:8000/admin/

    8. access site

    http://localhost:8000/streaming_app/


### React

    1. install node_modules

        cd streaming/mysite/frontend

        npm install

    2. run development server

        npm start

        http://localhost:3000/streaming_app/

    3. build

        npm run build

    4. add correct build filenames to streaming/mysite/streaming_app/templates/streaming_app/index.html

        cd streaming/scripts/
        python .\fix_filenames.py
