import re

def main():
    test = []
    with open("alluvic.html") as f:
        file = open('newu.txt', 'w')
        url = ''
        for line in f:
            if re.search('\/ShowRatings\.jsp\?tid=[0-9]*',line):
                url = re.search('\/ShowRatings\.jsp\?tid=[0-9]*',line)
                #print(url.group())
            if re.search( '[A-Za-z]*,\s[A-Za-z]*',line):
                strng = re.search( '(?P<last_name>[A-Za-z]*),\s(?P<first_name>[A-Za-z]*)',line)
                file.write(strng.group('first_name')+ ' ' + strng.group('last_name'))
               
                #file.write(strng.group('last_name'))
                file.write("\n")
                file.write(url.group())
                file.write("\n")


    #<span class="name">[A-Za-z]*,\s[A-Za-z]*'
                #groupie = re.match( r'<span class="name">(?P<last_name>[A-Za-z]*),(?P<first_name>\s[A-Za-z]*)',line)
                
               # test.append(groupie.group('first_name') +" " + groupie.group('last_name'))
               # print(groupie.group('first_name'))
    




main()
