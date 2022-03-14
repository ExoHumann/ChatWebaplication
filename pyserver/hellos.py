
#!flask/bin/python                                                              
from flask import Flask                                                         
                                                                                
webservice = Flask(__name__)                                                    
                                                                                
@webservice.route('/')                                                          
def index():                                                                    
    return "Simple Web Service using Flask, Hello Python Flask Framwork!"       
                                                                                
if __name__ == '__main__':                                                      
    webservice.run(debug=True) 