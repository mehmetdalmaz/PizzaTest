using Microsoft.EntityFrameworkCore;
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
        private readonly AppDbContext _context;
        public EFAddressDal(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public List<Address> GetListByUserId(int userId)
        {
            return _context.Addresses.Where(a => a.UserID == userId).ToList();
        }
    }
}
