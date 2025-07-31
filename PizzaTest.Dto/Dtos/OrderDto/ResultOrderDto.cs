using PizzaTest.Dto.Dtos.OrderDetailDto;
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
        public int UserID { get; set; }
        public int AddressID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderNote { get; set; }

        public List<ResultOrderDetailDto> OrderDetails { get; set; }

    }
}
