def serializePrice(price):
    price = price.replace(" per maand", "")
    price = price.replace(".", "")
    price = price[2:]
    price = int(price)

    return price


def serializeRooms(number_of_rooms):
    number_of_rooms = number_of_rooms.replace(" kamer", "")
    number_of_rooms = number_of_rooms.replace("s", "")

    return number_of_rooms