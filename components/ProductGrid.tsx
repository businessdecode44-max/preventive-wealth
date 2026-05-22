import Image from "next/image";
import { CheckoutButton } from "@/components/CheckoutButton";
import { products } from "@/lib/products";

export function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.key}>
          <Image
            src={product.image}
            alt={`Series ${product.number} cover: ${product.title}`}
            width={540}
            height={720}
            sizes="(max-width: 620px) 100vw, (max-width: 1120px) 33vw, 25vw"
          />
          <div className="product-body">
            <span className="product-meta">
              Series {product.number} | {product.audience}
            </span>
            <h3>{product.title}</h3>
            <p>{product.benefit}</p>
            <CheckoutButton productKey={product.key} productName={product.title} className="button button-secondary">
              {product.buttonLabel}
            </CheckoutButton>
          </div>
        </article>
      ))}
    </div>
  );
}
