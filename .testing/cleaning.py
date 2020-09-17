# This is a script to remove users from the data base that do not exist.
from firebase_admin import db, credentials, auth
import firebase_admin

cred = credentials.Certificate('gunnwebapp-firebase-adminsdk-6kaw3-a349f9d17e.json')

default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gunnwebapp.firebaseio.com'
})


def removeUsers():
    userData = db.reference('users', default_app).get()
    for uid in userData.keys():
        try:
            user = auth.get_user(uid, default_app)
        except:
            print(uid + " is not valid")
            # now we need to remove it
            db.reference('users/' + uid).delete()

def placeUsers():
    # intended to be run AFTER removeUsers
    userData = db.reference('users', default_app).get()
    for uid in userData.keys():
        (c,r) = userData[uid]['location']
        peopleAtLoc = db.reference('grid/' + str(r) + '/' + str(c) + '/people').get()
        if (peopleAtLoc is None) or (uid not in peopleAtLoc):

            user = auth.get_user(uid, default_app)
            newData = {
                uid: {
                    "username": user.display_name,
                    "photo": user.photo_url
                }
            }
            #print("User %s %s is not at %s so I am sending %s" % (uid, user.display_name, str([c,r]),newData))


            db.reference('grid/' + str(r) + '/' + str(c) + '/people').update(newData)
def janitor():
    removeUsers()
    placeUsers()
    gridData = db.reference('grid', default_app).get()
    r = 0

    for row in gridData:
        c = -1
        for cell in row:
            c += 1
            if 'people' not in cell.keys():
                continue
            for person in cell['people'].keys():
                try:
                    user = auth.get_user(person, default_app)
                    uLoc = db.reference('users/' + person + '/location').get()
                    if uLoc != [c, r]:
                        yes = input(person + " is in the wrong spot ("+str([c,r])+") instead of "+str(uLoc)+". Delete them?")
                        if yes=="y":
                            db.reference('grid/' + str(r) + '/' + str(c) + '/people/' + person).delete()
                except:
                    print(person + " is not valid")
                    print('grid/' + str(r) + '/' + str(c) + '/people/' + person)
                    db.reference('grid/' + str(r) + '/' + str(c) + '/people/' + person).delete()
                    # now we need to remove it
                # also remove it if this isn't the persons location

        r += 1


janitor()
#placeUsers()