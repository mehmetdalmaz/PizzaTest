using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Entity.Concrete
{
    public class Order
    {
        public int ID { get; set; }
        public string? UserId { get; set; }
        public int UserAddressID { get; set; }
        public int UserPaymentCardID { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public decimal TotalPrice { get; set; }
        public string? OrderNote { get; set; }


        public Address Address { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }

    }
}
