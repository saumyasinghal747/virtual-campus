def identifyBuilding(x,y,type):
    if type in ['road','parking']:
        return [False, None, None]
    # The J Building
    if type=='science' and x<7 and y<5:
        return [
            True,
            'J Building',
            'This is the science hub of the school. Find the science teachers'
            ' and most of your science classes in this building.'
        ]
    elif type=='language' and y<12:
        return [
            True,
            'H Building',
            '''Here's where you'll find world languages such as French, German, Chinese, and Japanese. It's also home to the Language office.'''
        ]
    elif type=='language':
        return [
            True,
            'Main Office & Bat Cave',
            'Have a question? Sick? Confused? Lost? <i>In trouble?</i> This is the place for you.'
        ]
    elif type=='cefg' and y<12:
        return [
            True,
            'G Building',
            'This is where you\'ll find world languages such as Spanish or French. The computer lab is also here.'
        ]
    else:
        return [False]

print(identifyBuilding(3,3,'science'))