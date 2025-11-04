import Navigation from "../Navigation";
import { ThemeProvider } from "../ThemeProvider";

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 px-8 space-y-4">
          <p className="text-muted-foreground">
            Scroll down to see the navigation bar change style...
          </p>
          <div className="space-y-96">
            <div id="home" className="h-96 flex items-center justify-center bg-muted/30 rounded-md">
              <h2 className="text-2xl font-bold">Home Section</h2>
            </div>
            <div id="about" className="h-96 flex items-center justify-center bg-muted/30 rounded-md">
              <h2 className="text-2xl font-bold">About Section</h2>
            </div>
            <div id="projects" className="h-96 flex items-center justify-center bg-muted/30 rounded-md">
              <h2 className="text-2xl font-bold">Projects Section</h2>
            </div>
            <div id="contact" className="h-96 flex items-center justify-center bg-muted/30 rounded-md">
              <h2 className="text-2xl font-bold">Contact Section</h2>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
