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
        public int UserID { get; set; }
        public int AddressID { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;
        public DateTime? DeliveryDate { get; set; } = DateTime.Now.AddDays(2);
        public decimal TotalPrice { get; set; }
        public string OrderNote { get; set; }


        public User User { get; set; }
        public Address Address { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }

    }
}
