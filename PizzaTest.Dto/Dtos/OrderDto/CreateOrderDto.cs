using PizzaTest.Dto.Dtos.OrderDetailDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.OrderDto
{
    public class CreateOrderDto
    {
        public int AddressID { get; set; }
        public string OrderNote { get; set; }

    }
}
