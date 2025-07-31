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
    public class EFCategoryDal : GenericRepository<Category>, ICategoryDal
    {
        private readonly AppDbContext _context;
        public EFCategoryDal(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public List<Category> TGetCategoriesWithProducts()
        {
            return _context.Categories
                .Include(c => c.Products)
                .ToList();
        }
    }
}
