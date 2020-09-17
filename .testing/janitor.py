# This is a script to remove users from the data base that do not exist.
from firebase_admin import db, credentials, auth
import firebase_admin

cred = credentials.Certificate('gunnwebapp-firebase-adminsdk-6kaw3-a349f9d17e.json')

default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gunnwebapp.firebaseio.com'
})