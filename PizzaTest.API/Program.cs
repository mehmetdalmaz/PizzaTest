using HotelProject.WebUI.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PizzaTest.API.Models;
using PizzaTest.API.Services;
using PizzaTest.Business.Abstract;
using PizzaTest.Business.Concrete;
using PizzaTest.DataAccess.Abstract;
using PizzaTest.DataAccess.Context;
using PizzaTest.DataAccess.EntityFramework;
using PizzaTest.Entity.Concrete;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>

{

    c.SwaggerDoc("v1", new() { Title = "PizzaTest.Api", Version = "v1" });

    // JWT desteði

    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme

    {

        Name = "Authorization",

        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,

        Scheme = "Bearer",

        BearerFormat = "JWT",

        In = Microsoft.OpenApi.Models.ParameterLocation.Header,

        Description = "JWT token'ýnýzý girin. Örn: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement

    {

        {

            new Microsoft.OpenApi.Models.OpenApiSecurityScheme

            {

                Reference = new Microsoft.OpenApi.Models.OpenApiReference

                {

                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,

                    Id = "Bearer"

                }

            },

            Array.Empty<string>()

        }

    });

});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<ICartItemDal, EFCartItemsDal>();
builder.Services.AddScoped<ICategoryDal, EFCategoryDal>();
builder.Services.AddScoped<IOrderDal, EFOrderDal>();
builder.Services.AddScoped<IOrderDetailDal, EFOrderDetailsDal>();
builder.Services.AddScoped<IAddressDal, EFAddressDal>();
builder.Services.AddScoped<IProductDal, EFProductsDal>();
builder.Services.AddScoped<ICartDal, EFCartDal>();
builder.Services.AddScoped<IUserDal, EFUserDal>();


builder.Services.AddScoped<ICartItemService, CartItemManager>();
builder.Services.AddScoped<ICategoryService, CategoryManager>();
builder.Services.AddScoped<IOrderService, OrderManager>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailsManager>();
builder.Services.AddScoped<IProductService, ProductsManager>();
builder.Services.AddScoped<ICartService, CartManager>();
builder.Services.AddScoped<IAddressService, AddressManager>();
builder.Services.AddScoped<IUserService, UserManager>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<TokenService>();

builder.Services.AddAutoMapper(typeof(AutoMappingConfig).Assembly);

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate(); 
    DataSeeder.SeedAdminUser(dbContext); 
}


app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
