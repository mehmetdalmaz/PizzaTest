using ShopHub.Dto.Dtos.OrderDetailDto;
using ShopHub.Entity.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.OrderDto
{
    public class CreateOrderDto
    {
        public string? UserId { get; set; }
        public int AddressID { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderNote { get; set; }

        public List<CreateOrderDetailDto> OrderDetails { get; set; }
    }
}
