import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import { FiChevronDown, FiCheckCircle, FiUserPlus, FiTag } from 'react-icons/fi'

interface BulkActionsProps {
  selectedCount: number
  onClearSelection: () => void
  onBulkAction: (action: string) => void
}

export function BulkActions({ selectedCount, onClearSelection, onBulkAction }: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <HStack
      bg="brand.50"
      borderBottom="1px"
      borderColor="brand.200"
      px={4}
      py={3}
      spacing={4}
    >
      <Text fontWeight="600" color="brand.700">
        {selectedCount} ticket{selectedCount > 1 ? 's' : ''} selected
      </Text>

      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />} size="sm" variant="outline">
          Set Status
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiCheckCircle />} onClick={() => onBulkAction('status:open')}>
            Open
          </MenuItem>
          <MenuItem icon={<FiCheckCircle />} onClick={() => onBulkAction('status:pending')}>
            Pending
          </MenuItem>
          <MenuItem icon={<FiCheckCircle />} onClick={() => onBulkAction('status:solved')}>
            Solved
          </MenuItem>
          <MenuItem icon={<FiCheckCircle />} onClick={() => onBulkAction('status:closed')}>
            Closed
          </MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />} size="sm" variant="outline">
          Set Priority
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onBulkAction('priority:urgent')}>Urgent</MenuItem>
          <MenuItem onClick={() => onBulkAction('priority:high')}>High</MenuItem>
          <MenuItem onClick={() => onBulkAction('priority:normal')}>Normal</MenuItem>
          <MenuItem onClick={() => onBulkAction('priority:low')}>Low</MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />} size="sm" variant="outline">
          Assign
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiUserPlus />} onClick={() => onBulkAction('assign:agent-1')}>
            Alex Rivera
          </MenuItem>
          <MenuItem icon={<FiUserPlus />} onClick={() => onBulkAction('assign:agent-2')}>
            Jordan Lee
          </MenuItem>
          <MenuItem icon={<FiUserPlus />} onClick={() => onBulkAction('assign:agent-3')}>
            Taylor Swift
          </MenuItem>
        </MenuList>
      </Menu>

      <Button size="sm" variant="ghost" onClick={onClearSelection}>
        Clear Selection
      </Button>
    </HStack>
  )
}
