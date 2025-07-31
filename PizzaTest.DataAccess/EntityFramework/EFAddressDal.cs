using PizzaTest.DataAccess.Abstract;
using PizzaTest.DataAccess.Context;
using PizzaTest.DataAccess.Repositories;
using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.DataAccess.EntityFramework
{
    public class EFAddressDal : GenericRepository<Address>, IAddressDal
    {
        public EFAddressDal(AppDbContext context) : base(context)
        {
        }
    }
}
