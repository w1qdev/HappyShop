from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo
from flask_cors import CORS


app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/happyshop"
mongo = PyMongo(app)
db = mongo.db

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


# create new user
@app.route("/api/users/create", methods=["POST"])
def create_new_user():
    try:
        response = make_response()
        request_data = {}

        if (request.data): 
            request_data = request.get_json()


        isUserExists = db.users.find_one({ "email": request_data['email'] })

        if (isUserExists):
            return jsonify({
                "message": "Данный пользователь уже существует"    
            })
        

        db.users.insert_one(request_data)

        response = jsonify({
            'message': "Новый пользователь успешно зарегистрирован",
            'fullName': request_data['name'],
        })

        return response
    except:
        print("Some Internal Error")



# create new product
@app.route("/api/products/create", methods=["POST"])
def create_new_product():
    try:
        response = make_response()
        request_data

        if (request.data):
            request_data = request.get_json()
            
        print(request_data)
        # request_data = request.get_json()

        # db.products.insert_one(request_data)

        response = jsonify({
            'message': 'Новый продукт успешно создан'
        })

        return response
    except:
        print("Some Internal Error")



@app.route("/api/products/", methods=["GET"])
def get_all_products():
    try:
        # response = make_response()
        
        # products = db.products.find()

        # print(products)

        # response = jsonify({
        #     'body': products
        # })

        return jsonify({ 
            'body': [
                {
                    "id": "1",
                    "title": "Продукт 1",
                    "description": "Описание 1",
                    "price": "345",
                    "count": "5",
                }
            ]
        })
    except:
        print("Some Internal Error")




# create new order
@app.route("/api/orders/create", methods=["POST"])
def create_new_order():
    try:
        response = make_response()
        request_data = request.get_json()

        db.orders.insert_one(request_data)

        response = jsonify({
            'message': 'Новый заказ успешно создан'
        })

        return response
    except:
        print("Some Internal Error")





if __name__ == '__main__': 
    app.run(debug=True, port=5000) 

