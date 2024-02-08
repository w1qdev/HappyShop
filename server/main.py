from flask import Flask, jsonify, request, make_response, send_file
from flask_pymongo import PyMongo
from flask_cors import CORS
from random import randint


app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/happyshop"
mongo = PyMongo(app)
db = mongo.db

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


def get_all_collection_data(cursor):
    collection_data = []

    while True:
        try:
            document = cursor.next()
            collection_data.append(document)
        except StopIteration:
            break
    
    return collection_data



def generate_user_id():
    lettersUpperList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    lettersLowerList = lettersUpperList.lower()
    numbers = "0123456789"

    uid = f'''{lettersUpperList[randint(0, len(lettersUpperList) - 1)]}{lettersUpperList[randint(0, len(lettersUpperList) - 1)]}{lettersUpperList[randint(0, len(lettersUpperList) - 1)]}{lettersUpperList[randint(0, len(lettersUpperList) - 1)]}{lettersLowerList[randint(0, len(lettersLowerList) - 1)]}{lettersLowerList[randint(0, len(lettersLowerList) - 1)]}{lettersLowerList[randint(0, len(lettersLowerList) - 1)]}{lettersLowerList[randint(0, len(lettersLowerList) - 1)]}{numbers[randint(0, len(numbers) - 1)]}{numbers[randint(0, len(numbers) - 1)]}{numbers[randint(0, len(numbers) - 1)]}{numbers[randint(0, len(numbers) - 1)]}{numbers[randint(0, len(numbers) - 1)]}'''

    return uid


# create new user
@app.route("/api/users/create", methods=["POST"])
def create_new_user():
    try:
        response = make_response()
        request_data = {}

        if (request.data): 
            request_data = request.get_json()
        
        request_data['uid'] = generate_user_id()
        request_data['orders'] = []

        isUserExists = db.users.find_one({ "email": request_data['email'] })

        if (isUserExists):
            return jsonify({
                "error": "Данный пользователь уже существует"    
            })  

        db.users.insert_one(request_data)

        response = jsonify({
            'message': "Новый пользователь успешно зарегистрирован",
            'fullName': request_data['name'],
            'uid': request_data['uid']
        })

        return response
    except:
        print("Some Internal Error")


# create new user
@app.route("/api/users/signin", methods=["POST"])
def signin_user():
    try: 
        response = make_response()
        request_data = {}

        if (request.data): 
            request_data = request.get_json()

        user = db.users.find_one({ "email": request_data['email'] })

        if (user == None):
            return jsonify({
                "error": "Введенные данные оказались неверными"    
            })  
        
        if (request_data['password'] != user['password']):
            return jsonify({
                "error": "Введенные данные оказались неверными"    
            }) 

        response = jsonify({
            'message': "Успешный вход в аккаунт",
            'fullName': user['name'],
            'email': user['password']
        })

        return response


    except: 
        print("Some Internal Error")


# create new product
@app.route("/api/products/create", methods=["POST"])
def create_new_product():
    try:
        # FIX: doesn't work!!! 
        # print(request.get_json())

        # response = make_response()
        # request_data = {}

        # if (request.data): 
        #     request_data = request.get_json()
        
        # print(request_data)

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
        products = db.products.find()
        # collection_data = get_all_collection_data(products)

        response_data = jsonify({ 
            "body": [
                { "id": 1, "title": "Небесный шик", "description": "Этот стильный топ с ярким принтом поднимет ваше настроение", "price": 2490, "warehouseCount": 5 },
                { "id": 2, "title": "Гламурная блуза", "description": "Эта легкая и воздушная блузка идеально подойдет для создания элегантного образа", "price": 2990, "warehouseCount": 3 },
                { "id": 3, "title": "Романтичное платье", "description": "Это изящное платье с цветочным принтом, которое подчеркнет вашу женственность", "price": 4990, "cowarehouseCountunt": 2 },
                { "id": 4, "title": "Комфортные джинсы", "description": "Эти стильные джинсы с высокой посадкой обеспечат комфорт и удобство на каждый день", "price": 2990, "couwarehouseCountnt": 8 },
                { "id": 5, "title": "Спортивные леггинсы", "description": "Леггинсы с функцией поддержки мышц и вентиляции для активных тренировок", "price": 3490, "warehouseCount": 6 },
                { "id": 6, "title": "Модные кроссовки", "description": "Кроссовки с современным дизайном и амортизацией для комфортной ходьбы и бега", "price": 5990, "warehouseCount": 5 },
                { "id": 7, "title": "Уютный свитер", "description": "Мягкий и теплый свитер с высоким воротником для уютных зимних дней", "price": 4490, "warehouseCount": 3 },
                { "id": 8, "title": "Стильная куртка", "description": "Легкая и функциональная куртка с водоотталкивающей пропиткой для любой погоды", "price": 7990, "warehouseCount": 2 },
                { "id": 9, "title": "Элегантная сумка", "description": "Сумка с изящным дизайном и множеством карманов для хранения ваших вещей", "price": 6990, "warehouseCount": 10 },
                { "id": 10, "title": "Комфортные джинсы", "description": "Эти стильные джинсы с высокой посадкой обеспечат комфорт и удобство на каждый день", "price": 3190, "warehouseCount": 8 },
            ]
        })

        return response_data
    except:
        print("Some Internal Error")




# create new order
@app.route("/api/orders/create", methods=["POST"])
def create_new_order():
    try:
        request_data = request.get_json()

        query_data = { 'uid': request_data['uid'] }

        isOrderExist = db.orders.find_one(query_data)

        if (isOrderExist):
            existOrder = db.orders.find_one_and_delete(query_data)
            existOrder['orders'] += request_data['basketStore']

            order_data = {
                'totalPrice': request_data['basketPrice'],
                'uid': request_data['uid'],
                'orders': existOrder['orders']
            }    

            db.orders.insert_one(order_data)

            response = jsonify({
                'message': 'Новый заказ успешно создан'
            })

            return response


        order_data = {
            'totalPrice': request_data['basketPrice'],
            'uid': request_data['uid'],
            'orders': request_data['basketStore']
        }

        db.orders.insert_one(order_data)

        response = jsonify({
            'message': 'Новый заказ успешно создан'
        })

        return response
    except:
        print("Some Internal Error")


# get order data
@app.route("/api/orders/<uid>", methods=["GET"])
def get_order_data(uid):
    try:
        orders_data = db.orders.find_one({ 'uid': uid })

        if (orders_data):
            response = jsonify({    
                'message': 'Список заказов',
                'orders': orders_data['orders']
            })
        elif (orders_data == None):
            response = jsonify({
                'message': 'Заказов не найдено'
            })

        return response

    except:
        print("Some Internal Error")

# create new order
@app.route("/api/orders/remove-item", methods=["POST"])
def remove_user_order_item():
    try: 
        request_data = request.get_json()
        
        query_data = { 'uid': request_data['uid'] }
        isOrderExist = db.orders.find_one(query_data)
        if (isOrderExist):
            existOrder = db.orders.find_one_and_delete(query_data) # TODO: switch to find_one_and_delete 
            filteredExistOrder = [el for el in existOrder['orders'] if el["id"] != int(request_data['id'])]
            
            order_data = {
                'totalPrice': 0, # TODO: make function which gonna calculate totalPrice using new orders list data
                'uid': request_data['uid'],
                'orders': filteredExistOrder
            }

            db.orders.insert_one(order_data)

            response = jsonify({
                'message': 'Заказ успешно удалён',
                'new-orders': filteredExistOrder
            })

            return response


        response = jsonify({
            'message': 'Заказов не найдено'
        }) 

        return response


    except: 
        print("Some Internal Error")

# create new order
@app.route("/api/orders/remove-all", methods=["DELETE"])
def remove_user_order_all():
    pass


if __name__ == '__main__': 
    app.run(debug=True, port=5000) 

