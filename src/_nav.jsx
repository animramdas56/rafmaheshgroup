/**
 * Sidebar Navigation Configuration
 *
 * Defines the structure and content of the sidebar navigation menu.
 * Supports multiple navigation component types from CoreUI React:
 * - CNavItem: Single navigation link
 * - CNavGroup: Collapsible group of links
 * - CNavTitle: Section title/divider
 *
 * @module _nav
 */

import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

/**
 * Navigation menu structure array
 *
 * @type {Array<Object>}
 * @property {React.ComponentType} component - CoreUI nav component (CNavItem, CNavGroup, CNavTitle)
 * @property {string} name - Display text for the nav item
 * @property {string} [to] - Internal route path (for CNavItem with routing)
 * @property {string} [href] - External URL (for CNavItem with external links)
 * @property {React.ReactNode} [icon] - Icon element to display
 * @property {Object} [badge] - Optional badge configuration
 * @property {string} badge.color - Badge color (info, danger, success, etc.)
 * @property {string} badge.text - Badge text content
 * @property {Array<Object>} [items] - Child items for CNavGroup
 *
 * @example
 * // Simple navigation item
 * {
 *   component: CNavItem,
 *   name: 'Dashboard',
 *   to: '/dashboard',
 *   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
 * }
 *
 * @example
 * // Navigation group with children
 * {
 *   component: CNavGroup,
 *   name: 'Base',
 *   to: '/base',
 *   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
 *   items: [
 *     {
 *       component: CNavItem,
 *       name: 'Cards',
 *       to: '/base/cards',
 *     },
 *   ],
 * }
 *
 * @example
 * // Section title
 * {
 *   component: CNavTitle,
 *   name: 'Theme',
 * }
 */
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Corporate',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Employees',
        to: '/employees',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Mining',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Mining Dashboard',
        to: '/mining',
      },
    ],
  },

  {
  component: CNavGroup,
  name: 'Logistics',
  items: [
    {
      component: CNavItem,
      name: 'Logistics Dashboard',
      to: '/logistics',
    },
  ],
},

  {
    component: CNavGroup,
    name: 'Transport & Auto',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Vehicles',
        to: '/vehicles',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Real Estate',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Properties',
        to: '/properties',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Industrial Materials',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inventory',
        to: '/inventory',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'IT Consulting',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Projects',
        to: '/projects',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Agriculture',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Farm Operations',
        to: '/agriculture',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Finance',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Finance Dashboard',
        to: '/finance',
      },
    ],
  },
]
export default _nav