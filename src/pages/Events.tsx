import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
            <p className="text-lg text-muted-foreground">
              Meld dig til vores kommende events og netværk med andre unge iværksættere
            </p>
          </div>
          
          <div className="flex justify-center">
            <iframe
              src="https://luma.com/embed/event/evt-3FHJkLWSIfgIAsJ/simple"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: "1px solid #bfcbda88", borderRadius: "4px" }}
              allow="fullscreen; payment"
              aria-hidden="false"
              tabIndex={0}
              title="Unge Iværksættere Event"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;