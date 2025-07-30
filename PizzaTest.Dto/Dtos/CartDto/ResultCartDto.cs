using ShopHub.Dto.Dtos.CartItemDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.CartDto
{
    public class ResultCartDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<ResultCartItemDto> CartItems { get; set; }
    }
}
