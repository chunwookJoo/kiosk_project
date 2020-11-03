from django.db import models


# Create your models here.
class customer_bill(models.Model):
    order_id = models.IntegerField(max_length=50)
    order_time = models.DateTimeField(max_length=100)
    goods_name = models.CharField(max_length=50)
    goods_price = models.IntegerField(max_length=50)
    goods_count = models.IntegerField(max_length=50)
    payment = models.IntegerField(max_length=50)
    payment_method = models.CharField(max_length=50)


class order_bill(models.Model):
    order_id = models.IntegerField(max_length=50)
    order_time = models.DateTimeField(max_length=100)
    goods_id = models.CharField(max_length=50)
    goods_name = models.CharField(max_length=50)
    goods_count = models.IntegerField(max_length=50)


class Contens(models.Model):
    goods_name = models.CharField(max_length=50)
    goods_price = models.IntegerField(max_length=50)
    goods_origin = models.CharField(max_length=50)
