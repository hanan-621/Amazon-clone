import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const banners = [
    {
      title: "Find Everything You Need",
      description:
        "Shop laptops, phones, electronics, fashion, home products and more.",
      button: "Shop Now",
    },
    {
      title: "Upgrade Your Technology",
      description:
        "Discover the latest laptops, smartphones, headphones and gaming products.",
      button: "Explore Electronics",
    },
    {
      title: "Great Deals Every Day",
      description:
        "Save more on products you love with great deals across many categories.",
      button: "View Deals",
    },
    {
      title: "New Products Are Here",
      description:
        "Explore the newest products and discover something you will love.",
      button: "Shop New Arrivals",
    },
  ];

  const categories = [
    {
      title: "Electronics",
      items: [
        {
          name: "Headphones",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        },
        {
          name: "Tablets",
          image:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        },
        {
          name: "Speakers",
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        },
        {
          name: "Gaming",
          image:
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500",
        },
      ],
    },

    {
      title: "Fashion",
      items: [
        {
          name: "Men's Clothing",
          image:
            "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
        },
        {
          name: "Women's Clothing",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
        },
        {
          name: "Shoes",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        },
        {
          name: "Accessories",
          image:
            "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=500",
        },
      ],
    },

    {
      title: "Home & Kitchen",
      items: [
        {
          name: "Furniture",
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
        },
        {
          name: "Kitchen",
          image:
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
        },
        {
          name: "Decor",
          image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500",
        },
        {
          name: "Appliances",
          image:
            "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500",
        },
      ],
    },

    {
      title: "Books",
      items: [
        {
          name: "Fiction",
          image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        },
        {
          name: "Non-fiction",
          image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        },
        {
          name: "Children's Books",
          image:
            "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500",
        },
        {
          name: "Education",
          image:
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
        },
      ],
    },

    {
      title: "Beauty",
      items: [
        {
          name: "Skincare",
          image:
            "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500",
        },
        {
          name: "Makeup",
          image:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
        },
        {
          name: "Haircare",
          image:
            "https://images.unsplash.com/photo-1527799820374-dcf8c9d4a388?w=500",
        },
        {
          name: "Fragrance",
          image:
            "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        },
      ],
    },

    {
      title: "Toys and Games",
      items: [
        {
          name: "Toys",
          image:
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500",
        },
        {
          name: "Board Games",
          image:
            "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500",
        },
        {
          name: "Puzzles",
          image:
            "https://images.unsplash.com/photo-1606503153255-59d8b8b8210c?w=500",
        },
        {
          name: "Outdoor",
          image:
            "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500",
        },
      ],
    },

    {
      title: "Sports and Outdoors",
      items: [
        {
          name: "Fitness",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
        },
        {
          name: "Running",
          image:
            "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500",
        },
        {
          name: "Cycling",
          image:
            "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500",
        },
        {
          name: "Outdoor",
          image:
            "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=500",
        },
      ],
    },

    {
      title: "Automotive",
      items: [
        {
          name: "Car Care",
          image:
            "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500",
        },
        {
          name: "Accessories",
          image:
            "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500",
        },
        {
          name: "Tools",
          image:
            "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500",
        },
        {
          name: "Car Parts",
          image:
            "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500",
        },
      ],
    },
  ];

  return (
    <main className="bg-gray-100">
      {/* ==================== HERO BANNERS ==================== */}
      <section className="relative overflow-hidden bg-gray-800 text-white">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {banners.map((banner) => (
            <div
              key={banner.title}
              className="min-w-full snap-start"
            >
              <div className="mx-auto flex min-h-[320px] max-w-7xl items-center justify-center px-6 py-16 text-center sm:min-h-[380px] lg:min-h-[420px]">
                <div className="max-w-3xl">
                  <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                    {banner.title}
                  </h1>

                  <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
                    {banner.description}
                  </p>

                  <button className="mt-6 rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-500">
                    {banner.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.title}
              className={`h-2 w-2 rounded-full ${
                index === 0 ? "bg-yellow-400" : "bg-gray-400"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              {/* Category Title */}
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {category.title}
              </h3>

              {/* 4 Sub-Category Items */}
              <div className="grid grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <p className="mt-2 text-sm text-gray-700">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Explore Category */}
              <Link to={`/products?category=${encodeURIComponent(category.title)}`}
               className="mt-5 inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                Explore {category.title} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;