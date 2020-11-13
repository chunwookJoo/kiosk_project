def orderParsing(orderText):
    def allChekCount(ParsingOrder, num, MenuList):
        for menu in MenuList:
            if ParsingOrder[menu] == 1:
                ParsingOrder[menu] = num
        return ParsingOrder
    Menus = ["불고기버거세트", "치킨버거세트", "새우버거세트", "와퍼세트",
             "불고기버거", "치킨버거", "새우버거", "와퍼",
             "감자튀김", "양념감자", "치킨너겟", "어니언링",
             "콜라", "사이다", "환타", "맥주"]
    Ones = ["하나", "한개", "1"]
    Twos = ["둘", "두개", "2"]
    Threes = ["셋", "세개", "3"]
    Fours = ["넷", "네개", "4"]
    Fives = ["다섯", "5"]
    Sixes = ["여섯", "6"]

    ParsingOrder = {}
    allChekMenu = []

    orderText = orderText.replace(" ", "")
    for Menu in Menus:
        ParsingOrder[Menu] = 0
        textPosion = orderText.find(Menu)
        if textPosion != -1:
            ParsingOrder[Menu] = 1

    for Menu in Menus:
        textPosion = orderText.find(Menu)
        if textPosion != -1:
            tempOderText = orderText[textPosion +
                                     len(Menu):textPosion + len(Menu)+3]
            allCheck = tempOderText.find("씩")
            allChekMenu.append(Menu)
            ConfirmationNUM = 0
            for num in Ones:
                if tempOderText.find(num) != -1:
                    ParsingOrder[Menu] = 1
                    ConfirmationNUM = 1
                    allChekMenu.pop()
            for num in Twos:
                if tempOderText.find(num) != -1:
                    ParsingOrder[Menu] = 2
                    ConfirmationNUM = 2
                    allChekMenu.pop()
            for num in Threes:
                if tempOderText.find(num) != -1:
                    ParsingOrder[Menu] = 3
                    ConfirmationNUM = 3
                    allChekMenu.pop()
            for num in Fours:
                if tempOderText.find(num) != -1:
                    ParsingOrder[Menu] = 4
                    ConfirmationNUM = 4
                    allChekMenu.pop()
            for num in Fives:
                if tempOderText.find(num) != -1:
                    ParsingOrder[Menu] = 5
                    ConfirmationNUM = 5
                    allChekMenu.pop()
            for num in Sixes:
                if tempOderText.find(num) != -1:
                    ParsingOrder[Menu] = 6
                    ConfirmationNUM = 6
                    allChekMenu.pop()
            if allCheck != -1:
                ParsingOrder = allChekCount(
                    ParsingOrder, ConfirmationNUM, allChekMenu)
    result = {}
    result['result'] = 9
    ix = 0
    for key, val in ParsingOrder.items():
        if val != 0:
            result[f'{ix}'] = {'name': key, 'qty': int(val)}
            ix = ix + 1
    print(result)
    return result
