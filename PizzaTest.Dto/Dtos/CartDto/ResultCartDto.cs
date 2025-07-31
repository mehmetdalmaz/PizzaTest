using PizzaTest.Dto.Dtos.CartitemsDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.CartDto
{
    public class ResultCartDto
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<ResultCartItemDto> CartItems { get; set; }
    }
}
