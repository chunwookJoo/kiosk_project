from django.contrib import admin
from .models import customer_bill, order_bill, content

admin.site.register(customer_bill)
admin.site.register(order_bill)
admin.site.register(content)
# Register your models here.
