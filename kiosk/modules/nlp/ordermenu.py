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

    Nums = [["영", "영계", "0"],
            ["하나", "한개", "1"],
            ["둘", "두개", "2"],
            ["셋", "세개", "세계", "3"],
            ["넷", "네개", "4"],
            ["다섯", "5"],
            ["여섯", "6"],
            ["일곱", "7"],
            ["여덟", "8"],
            ["아홉", "9"], ]

    ParsingOrder = {}

    orderText = orderText.replace(" ", "")
    tempText = orderText
    for Menu in Menus:
        textPosition = tempText.find(Menu)
        if textPosition != -1:
            tempText = tempText[:textPosition] + \
                tempText[textPosition + len(Menu):]
            ParsingOrder[Menu] = 1

    tempText = orderText
    for Menu in Menus:
        textPosition = tempText.find(Menu)
        if textPosition != -1:
            ix = 0
            tempOrderText = tempText[textPosition: textPosition +
                                     len(Menu) + 2]
            for num in Nums:
                for t in num:
                    if tempOrderText.find(t) != -1:
                        tempText = tempText[:textPosition] + \
                            tempText[textPosition + len(Menu) + len(t):]
                        ParsingOrder[Menu] = ix
                ix = ix + 1

    print(ParsingOrder)

    result = {}
    result['result'] = 9
    ix = 0
    for key, val in ParsingOrder.items():
        if val != 0:
            result[f'{ix}'] = {'name': key, 'qty': int(val)}
            ix = ix + 1
        result['length'] = ix
    return result
