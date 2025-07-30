using ShopHub.Entity.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.OrderDto
{
    public class UpdateOrderDto
    {
        public OrderStatus Status { get; set; }
        public string? OrderNote { get; set; }

    }
}
