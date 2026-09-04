export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Recovery Fest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
