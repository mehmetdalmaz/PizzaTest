using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Abstract
{
    public interface IAddressService : IGenericService<Address>
    {
        List<Address> TGetListByUserId(int userId);

    }
}
