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
    public class EFProductsDal : GenericRepository<Products>, IProductDal
    {
        private readonly AppDbContext _context;
        public EFProductsDal(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public List<Products> GetProductsWithCategory()
        {
            return _context.Products.Include(p => p.Category).ToList();

        }
    }
}
