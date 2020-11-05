from django.contrib import admin
from .models import customer_bill, order_bill, contents

admin.site.register(customer_bill)
admin.site.register(order_bill)
admin.site.register(contents)
# Register your models here.
