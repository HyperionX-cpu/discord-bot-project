import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faCog,
  faChevronDown,
  faExternalLinkAlt,
  faBars,
  faXmark,
  faChartLine,
  faCode,
  faTicket,
  faComments,
  faSignOutAlt,
  faChevronRight,
  faChevronLeft,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { socket } from "../../socket"
import { ProfileButton } from "../ui/profile-button"
import { auth } from "../../lib/auth/auth"

const defaultNavigationItems = [
  {
    name: "Overview",
    href: "/",
    icon: faHome,
  },
  {
    name: "Support & Tickets",
    href: "/tickets",
    icon: faTicket,
  },
  {
    name: "Analytics",
    href: "/usage",
    icon: faChartLine,
  },
  {
    name: "Embed Builder",
    href: "/embed-builder",
    icon: faCode,
  },
  {
    name: "Suggestions",
    href: "/suggestions",
    icon: faComments,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: faCog,
  },
]

function NavSection({
  title,
  items,
  renderNavItem,
  isOpen: defaultIsOpen = true,
  isCollapsed = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="mt-4 first:mt-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {!isCollapsed && items && items.length > 0 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 mb-2 flex items-center justify-between py-1 rounded-md text-gray-400 hover:text-gray-200 focus:outline-none transition-colors"
        >
          <h3 className="text-xs font-semibold tracking-wider uppercase text-inherit">
            {title}
          </h3>
          <motion.div 
            animate={{ rotate: isOpen ? 0 : -90 }} 
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
          </motion.div>
        </button>
      )}

      {isOpen && (
        <ul className="space-y-1">
          {items.map((item, index) => renderNavItem(item, index))}
        </ul>
      )}
    </motion.div>
  )
}

export default function Sidebar({ isOpen: isSidebarOpen, onClose, onToggleCollapse, isCollapsed: isSidebarCollapsed }) {
  const location = useLocation()
  const [navName, setNavName] = useState("Clown Cheats")

  const renderNavItem = (item, index) => {
    const isActive = location.pathname === item.href

    const sharedClasses = `px-3 py-2.5 flex items-center rounded-md text-sm font-medium transition-colors relative ${
      isActive
        ? "text-white bg-blue-600 shadow-sm"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`

    return (
      <li key={item.href} className="relative">
        <Link
          to={item.href}
          className={`${sharedClasses} ${isSidebarCollapsed ? "justify-center" : ""} group`}
          onClick={() => {
            if (window.innerWidth < 1024) {
              onClose?.()
            }
          }}
        >
          <div className="relative flex items-center w-full">
            <div className={`${isSidebarCollapsed ? "mx-auto" : ""} relative ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <span className="ml-3 truncate">{item.name}</span>
            )}
          </div>
        </Link>
      </li>
    )
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col ${
      isSidebarCollapsed ? "w-20" : "w-64"
    } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold shadow-md">
            🤡
          </div>
          {!isSidebarCollapsed && (
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Clown Cheats</h1>
              <span className="text-xs text-blue-400 font-medium">Admin Dashboard</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
        <NavSection
          title="Management Menu"
          items={defaultNavigationItems}
          renderNavItem={renderNavItem}
          isCollapsed={isSidebarCollapsed}
        />
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-gray-800 bg-gray-950/50">
        <div className="flex items-center space-x-3">
          <img 
            src="https://i.postimg.cc/xJjS1vYm/nuke.gif" 
            alt="Avatar" 
            className="w-10 h-10 rounded-full border border-blue-500/50"
          />
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Hyperion</p>
              <p className="text-xs text-green-400 font-medium truncate">Owner / SuperAdmin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}