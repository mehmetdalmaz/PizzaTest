using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Entity.Concrete
{
    public class Cart
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public List<CartItems>? CartItems { get; set; } = new List<CartItems>();
    }
}
