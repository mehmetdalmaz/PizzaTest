using ShopHub.Dto.Dtos.OrderDetailDto;
using ShopHub.Dto.Dtos.ShippingInfoDto;
using ShopHub.Dto.Dtos.UserAddressDto;
using ShopHub.Entity.Concrete;
using ShopHub.Entity.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.OrderDto
{
    public class ResultOrderDto
    {
        public int ID { get; set; }
        public string? UserId { get; set; }
        public int AddressID { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderNote { get; set; }

        public List<ResultOrderDetailDto> OrderDetails { get; set; }

    }
}
