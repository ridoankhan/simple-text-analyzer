import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TextForm from '../components/TextForm'
import TextList from '../components/TextList'
import { Text } from '../types'
import textService from '../services/textService'
import { useAuth } from '../contexts/AuthContext'
import { Plus, X } from 'lucide-react'
import Api from '../services/api'

const DashboardPage: React.FC = () => {
  const [texts, setTexts] = useState<Text[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingText, setEditingText] = useState<Text | null>(null)

  const { user } = useAuth()
  const navigate = useNavigate()

  const loadTexts = async () => {
    setLoading(true)
    try {
      const data = await textService.getAllTexts()
      setTexts(data)
      setError(null)
    } catch (err) {
      console.error('Failed to load texts:', err)
      setError('Failed to load your texts. Please try refreshing the page.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      loadTexts()
    }
  }, [navigate])

  const handleTextCreated = () => {
    loadTexts()
    setShowForm(false)
    setEditingText(null)
  }

  const handleEdit = (text: Text) => {
    setEditingText(text)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingText(null)
    setShowForm(false)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 sm:px-0'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Text Dashboard</h1>

            <button
              onClick={() => setShowForm(!showForm)}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              {showForm ? (
                <>
                  <X className='h-4 w-4 mr-2' />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className='h-4 w-4 mr-2' />
                  New Text
                </>
              )}
            </button>
          </div>

          {error && (
            <div className='mb-6 bg-red-50 border-l-4 border-red-400 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-red-700'>{error}</p>
                </div>
              </div>
            </div>
          )}

          {showForm && (
            <div className='mb-6'>
              <TextForm
                onTextCreated={handleTextCreated}
                initialContent={editingText?.content || ''}
                textId={editingText?.id}
                isEditing={!!editingText}
                onCancel={handleCancel}
              />
            </div>
          )}

          <TextList
            texts={texts}
            onDelete={loadTexts}
            onEdit={handleEdit}
            loading={loading}
          />
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
