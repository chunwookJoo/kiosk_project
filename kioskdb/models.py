from django.db import models


# Create your models here.
class customer_bill(models.Model):
    order_id = models.IntegerField()
    order_time = models.DateTimeField()
    goods_name = models.CharField(max_length=50)
    goods_price = models.IntegerField()
    goods_count = models.IntegerField()
    payment = models.IntegerField()
    payment_method = models.CharField(max_length=50)


class order_bill(models.Model):
    order_id = models.IntegerField()
    order_time = models.DateTimeField()
    goods_id = models.CharField(max_length=50)
    goods_name = models.CharField(max_length=50)
    goods_count = models.IntegerField()


class contents(models.Model):
    goods_name = models.CharField(max_length=50)
    goods_price = models.IntegerField()
    goods_origin = models.CharField(max_length=50)
