from bs4 import BeautifulSoup
# from selenium import webdriver
# from selenium.webdriver.common.by import By
import requests
import pandas as p
import csv
import json
import _thread
import time
product_details=[]

stock_img=['https://rukminim2.flixcart.com/image/416/416/xif0q/cpu/h/x/y/3-0-alien-without-leg-play-free-fire-gta-gaming-desktop-500-original-imagztm6fgznv3md.jpeg?q=70',
           'https://rukminim2.flixcart.com/image/416/416/xif0q/television/1/k/6/-original-imagt86kaa7xfzgr.jpeg?q=70',
           'https://rukminim2.flixcart.com/image/612/612/jdvziq80/office-study-table/t/8/x/particle-board-reno-deckup-dark-wenge-original-imaf2p5agm25qqqh.jpeg?q=70',
           'https://rukminim2.flixcart.com/image/612/612/jyeq64w0/pen/w/g/p/flair-8901765132505-original-imafgnq4bgy7jzg5.jpeg?q=70',
           'https://rukminim2.flixcart.com/image/612/612/xif0q/bedsheet/a/g/w/wm-jaipuri-bedsheet-93-108-5-1-wm-jaipuri-bedsheet-93-108-1-5-original-imagquyfvhfpseuh.jpeg?q=70']

stock_price=['15000','20000','1700','30','810']
start=time.time()

def flipkart():
    for i in range(0,5):
        _thread.start_new_thread(flipkart_find,(i,))
    
    while(len(product_details)!=244):
        time.sleep(5)


def gem():
    for i in range(0,5):
        _thread.start_new_thread(gem_find,(i,)) 
    while(len(product_details)!=244):
        time.sleep(5)


def flipkart_find(pno):
    #comp,tv,table,pen,cotton_bedsheet
    links=['https://www.flipkart.com/computers/desktop-pcs/pr?sid=6bo,nl4&q=computer&otracker=categorytree',
        'https://www.flipkart.com/search?q=tv&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
        'https://www.flipkart.com/furniture/tables/office-study-table/pr?sid=wwe%2Cki7%2Cl1t&q=table&otracker=categorytree&page=1',
        'https://www.flipkart.com/search?q=pen&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
        'https://www.flipkart.com/search?q=cotton%20bedsheet&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off']

    p_link_class=['_2rpwqI','_1fQZEK','_2rpwqI','_2rpwqI','_2rpwqI']
    category=['Electronics','Electronics','Furniture','Stationary','Home Decor']
    sub_category=['Desktop Computer','TV','Table','Pen','Cotton Bedsheet']


    # for pno in range(0,len(links)):
    raw_data=requests.get(links[pno])
    html_data=raw_data.text

    data=BeautifulSoup(html_data,'html.parser')

    product_links=list(data.find_all(class_=p_link_class[pno]))

    

    for k in product_links:
        _thread.start_new_thread(flipkart_find_thread,(k,category[pno],sub_category[pno],stock_img[pno],stock_price[pno]))
    
    while(len(product_details)!=244):
        time.sleep(5)


def flipkart_find_thread(i,category,sub_category,Stock_img,Stock_price):
    name=''
    spec=''
    old_cost=''
    new_cost=''
    stock='In Stock'
    star=''
    img=''
    base='https://www.flipkart.com'

    i=base+i['href']
    raw_data=requests.get(i)
    html_data=raw_data.text

    data=BeautifulSoup(html_data,'html.parser')

    #finds name of product
    temp=data.find(class_='B_NuCI')

    if temp is not None:
        temp=list(temp.stripped_strings)
        for k in temp:
            name+=k
        # name=temp.text
    else:
        name=sub_category

    #finds rating/star of product
    temp=data.find(class_='_3LWZlK')
    if temp is not None:
        star=temp.text
    
    else:
        star="3.2"
    
    if star=="\n\n":
        star="3"

    
    #finds old price
    temp=data.find(class_='_3I9_wc _2p6lqe')
    if temp is not None:
        old_cost=temp.text
    else:
        old_cost="Unavailable"


    #finds new price
    temp=data.find(class_='_30jeq3 _16Jk6d')
    if temp is not None:
        new_cost=temp.text
    else:
        new_cost=Stock_price
        old_cost="Unavailable"
    

    #finds specs
    temp=list(data.find_all(class_='_21Ahn-'))
    count=0
    for k in temp:
        if k is not None: 
            q=list(k.stripped_strings)
            for x in q:
                spec+=x
                spec+=' '
                count+=1

    #find img link  
    temp=data.find(class_='_396cs4 _2amPTt _3qGmMb')
    if temp is not None:
        img=temp['src']
    else:
        img=Stock_img

    
    product_details.append([name,category,sub_category,i,spec,old_cost,new_cost,stock,star,img,'Flipkart'])
    count+=1
    # j+=1

def gem_find(pno):
    links=['https://mkp.gem.gov.in/computers-desktop-computer/search#/?page=1&_xhr=1',
        'https://mkp.gem.gov.in/domestic-appliances-and-supplies-and-consumer-electronic-products-consumer-electronics-audio-and-visual-equipmentold-28051-tv/search',
        'https://mkp.gem.gov.in/-furniture-and-furnishings-accommodation-furnitureold-freestanding-furniture-executive-table-version-2-/search',
        'https://mkp.gem.gov.in/drawing-tools-and-supplies-and-accessories-gel-pen-rev-/search',
        'https://mkp.gem.gov.in/bedclothes-handloom-cotton-bed-sheets-as-per-is-745-version-2-/search']

    name_no=['like-h3','like-h3','like-h3','like-h2','like-h3']
    category=['Electronics','Electronics','Furniture','Stationary','Home Decor']
    sub_category=['Desktop Computer','TV','Table','Pen','Cotton Bedsheet']

    # for pno in range(0,len(links)):

    raw_data=requests.get(links[pno])
    data=BeautifulSoup(raw_data.text,'html.parser')

    product_links=list(data.find_all(class_='variant-title'))


    for k in product_links:
        _thread.start_new_thread(gem_find_thread,(k,category[pno],sub_category[pno],name_no[pno],stock_img[pno],stock_price[pno]))
    while(len(product_details)!=244):
        time.sleep(5)


def gem_find_thread(i,category,sub_category,name_no,Stock_img,Stock_price):
    name=''
    spec=''
    old_cost=''
    new_cost=''
    stock=''
    star=''
    img=''

    base='https://mkp.gem.gov.in'
    i=base+i.a['href']
    # j+=1
    raw_data=requests.get(i)
    html_data=raw_data.text

    data=BeautifulSoup(html_data,'html.parser')

    #finds name of product
    temp=data.find(class_=name_no)

    if temp is not None:
        temp=list(temp.stripped_strings)
        for k in temp:
            name+=k
        # name=temp.text
    else:
        name=sub_category
    
    
    #finds spec of the product
    temp=list(data.find_all(class_='param-container'))
    spec=''
    count=0
    for k in temp:
        if k is not None: 
            q=list(k.stripped_strings)
            for x in q:
                spec+=x
                spec+=' '
                count+=1
                #    print(count)
                if count==8:
                        break
            if count==8:
                break
    

    #old price
    temp=data.find(class_='list_price')
    if temp is not None:
        old_cost=temp.span.text
    else:
        old_cost='Unavailable'

    #new price
    temp=data.find(class_='m-w')
    if temp is not None:
        new_cost=temp.text
    else:
        new_cost=Stock_price
        old_cost="Unavailable"



    #find stock
    temp=data.find(class_='green') #later on change 'green' with 'pdp-availability'
    if temp is not None:
        stock=temp.text
        
    else:
        stock='In Stock'
    

    #finding rating
    temp=data.find(class_='badge')
    if temp is not None:
        star=temp.text
        
    else:
        star='4.3'
    
    if star=="\n\n":
        star=4.4
    
    
    #finds img link
    temp=data.find(id='medium-image-holder')
    if temp is not None:
        temp=temp.find('img')
        img=temp['src']
    else:
        img=Stock_img
    
    product_details.append([name,category,sub_category,i,spec,old_cost,new_cost,stock,star,img,"GeM"])

    count+=1


_thread.start_new_thread(flipkart,())
gem()


df=p.DataFrame(product_details,columns =['name','category','sub_category','product_link','specification','old_cost','new_cost','stock','rating','image','site'])
df.to_csv('t_final.csv',index=False)

# Replace 'input.csv' and 'output.json' with your file names
csv_file = 't_final.csv'
json_file = 't_final.json'

# Open the CSV file for reading
with open(csv_file, 'r', encoding="utf8") as csv_input_file:
    # Read CSV data into a list of dictionaries
    csv_data = list(csv.DictReader(csv_input_file))

# Write the JSON data to the output file
with open(json_file, 'w') as json_output_file:
    json.dump(csv_data, json_output_file, indent=4)

print(time.time()-start)