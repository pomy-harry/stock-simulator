import pandas as pd
# pip install mysqlclient
import MySQLdb


def createStockTable(hosturl, username, password, database) : 

    # 데이터 불러오기
    df = pd.read_html('https://kind.krx.co.kr/corpgeneral/corpList.do?method=download', header=0)[0]
    df_stock = df.loc[:,['종목코드', '회사명']]
    df_stock.loc[:,'종목코드'] = df_stock.loc[:,'종목코드'].apply(str).str.rjust(6, '0')

    # MySQL 연결
    mydb = MySQLdb.connect(
        host = hosturl,
        user = username, 
        passwd = password, 
        db = database
    )

    mydb.set_character_set('utf8')

    mycursor = mydb.cursor()

    # MySQL SQL문 실행

    # DROP TABLE
    # sql_drop_stock_table = (

    #     "DROP TABLE STOCK"

    # )

    # mycursor.execute(sql_drop_stock_table)

    # CREATE TABLE
    sql_create_stock_table = (

        "CREATE TABLE STOCK (" +
            "STOCK_CODE VARCHAR(255) NOT NULL, " +
            "STOCK_NAME VARCHAR(255) NOT NULL, " +
            "PRIMARY KEY (STOCK_CODE) " +
        ")"

    )

    mycursor.execute(sql_create_stock_table)

    # INSERT DATA
    sql_insert_stock = "INSERT INTO STOCK (STOCK_CODE, STOCK_NAME) VALUES (%s, %s)"
    val_insert_stock = []
    for i in df_stock.index :
        val_insert_stock.append((df_stock.loc[i,'종목코드'], df_stock.loc[i,'회사명']))
        
    mycursor.executemany(sql_insert_stock, val_insert_stock)
    mydb.commit()

    # MySQL 연결 헤제
    mydb.close()



if __name__=="__main__" :

    createStockTable(
        hosturl="localhost",
        username="root", 
        password="1234", 
        database="stock_simulator"
    )


