using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Entity.Concrete
{
    public class Products
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageURl { get; set; }
        public int StockQuantity { get; set; }
        public int CategoryID { get; set; }
        public Category Category { get; set; }

        public ICollection<OrderDetails>? OrderDetails { get; set; }
        public ICollection<CartItems>? CartItems { get; set; }
    }
}
